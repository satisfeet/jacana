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

test-app:
	$(MOCHA) $(MOCHA_FLAGS) \
		test/app/models

build: \
	$(BROWSERIFY) $(BROWSERIFY_FLAGS)

db-create:
	bin/models create order --file opt/models/orders		\
	bin/models create product --file opt/models/products

db-remove: 
	bin/models remove order		\
	bin/models remove product

.PHONY: test
