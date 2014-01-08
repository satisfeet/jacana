MOCHA      = ./node_modules/.bin/mocha
BROWSERIFY = ./node_modules/.bin/browserify

MOCHA_FLAGS = 			\
		--reporter spec

BROWSERIFY_FLAGS = 										\
		--entry ./app/index.js 							\
		--outfile ./public/javascripts/build.js 		\
		--transform ./lib/engine/builder/templates.js

boot:
	@node lib

test: \
	test-lib 	\
	test-bin

test-lib:
	$(MOCHA) $(MOCHA_FLAGS) \
		test/lib/models 	\
		test/lib/static		\
		test/lib/routes

test-bin:
	$(MOCHA) $(MOCHA_FLAGS) \
		test/bin/models

build: \
	build-app

build-app:
	$(BROWSERIFY) $(BROWSERIFY_FLAGS)

.PHONY: test
