vpath %.css public/css
vpath %.html public

# HTML
svgfiles := $(wildcard public/*/*.svg)
public/%.html: export PYTHONWARNINGS=ignore
public/%.html: src/html/%.plim src/html/defs.plim $(svgfiles)
	@echo Compiling $< to $@
	@mkdir -p $$(dirname $@)
ifeq ($(DEBUG),1)
	@pudb $$(which plimc) -H -p extensions:preprocessor -o $@ $<
else
	@plimc -H -p extensions:preprocessor -o $@ $<
endif

htmlfiles := $(filter-out %/defs.html,$(subst src/html,public,$(patsubst %.plim,%.html,$(wildcard src/html/*/*.plim)))) $(filter-out %/defs.html,$(subst src/html,public,$(patsubst %.plim,%.html,$(wildcard src/html/*.plim))))
html: $(htmlfiles)


# XML
public/%.xml: export PYTHONWARNINGS=ignore
public/%.xml: src/xml/%.plim $(htmlfiles)
	@echo Compiling $< to $@
	@mkdir -p $$(dirname $@)
ifeq ($(DEBUG),1)
	@pudb $$(which plimc) -H -p extensions:preprocessor -o $@ $<
else
	@plimc -H -p extensions:preprocessor -o $@ $<
endif

xmlfiles := $(subst src/xml,public,$(patsubst %.plim,%.xml,$(wildcard src/xml/*/*.plim))) $(subst src/xml,public,$(patsubst %.plim,%.xml,$(wildcard src/xml/*.plim)))
xml: $(xmlfiles)


# TASKS
all: html css xml js

release: export NODE_ENV=production
release: export TAILWIND_MODE=build
release: all

watch-css: export TAILWIND_MODE=watch
watch-css:
	npx -y tailwindcss --postcss --jit -i .css/app.css -o public/css/app.css -w

dev: export NODE_ENV=development
dev: export TAILWIND_MODE=watch
dev:
	mp 'cd public/ && npx -y livereloadx --static' \
	   'caddy run --watch' \
	   'make watch-css' \
	   "open http://localhost:3999; rg --files --type-add 'plim:*.plim' -t plim -t stylus -t coffeescript -t svg | entr -s 'make -j html css js'"

clean:
	rm public/*.html 2>/dev/null || true
	rm public/**/*.html 2>/dev/null || true
	rm public/*.xml 2>/dev/null || true
	rm public/**/*.xml 2>/dev/null || true
	rm public/css/* 2>/dev/null || true
	rm public/js/compiled.*.js 2>/dev/null || true

deploy: export NODE_ENV=development
deploy: export TAILWIND_MODE=build
deploy: clean all
	wrangler pages deploy public/

# DEPS
system-deps:
	brew install fish python node caddy ripgrep entr git-delta sad
python-deps:
	pip install -r requirements.txt
node-deps:
	npm i --save postcss-cli@latest tailwindcss@latest postcss@latest autoprefixer@latest stylus@latest coffeescript@latest livereloadx@latest postcss-easings@latest postcss-easing-gradients@latest wrangler@latest
deps: system-deps python-deps node-deps


# CSS
.css:
	@mkdir -p .css

css: export PYTHONWARNINGS=ignore
css: public/css/app.css

.css/%.css: %.styl $(wildcard src/css/*.styl)
	@echo Compiling $< to $@
	@npx -y stylus -u rupture -c -m -o .css/ $<
stylus: .css/app.css

public/css/%.css: export TAILWIND_MODE=build
public/css/%.css: src/css/%.styl .css tailwind.config.js
	@echo Compiling $< to $@
	@npx -y stylus -u rupture -c -m -o .css/ $<
	@npx -y tailwindcss --postcss --jit -i .css/$*.css -o $@


# JS
public/js/compiled.%.js: src/js/%.coffee
	@echo Compiling $< to $@
	npx -y coffee --no-header -c -m -o $@ $<
js: $(patsubst src/js/%.coffee,public/js/compiled.%.js,$(wildcard src/js/*.coffee))
