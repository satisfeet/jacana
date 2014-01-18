MOCHA  = ./node_modules/.bin/mocha
MOCHA_PHANTOMJS = ./node_modules/.bin/mocha-phantomjs

MOCHA_FLAGS = \
	--reporter spec

PHANTOMJS_FLAGS = \
	--debug=yes

boot:
	@node lib

test: \
	test-lib \
	test-bin \
	test-app

test-lib:
	$(MOCHA) $(MOCHA_FLAGS) \
		opt/test/lib/models	\
		opt/test/lib/static	\
		opt/test/lib/routes

test-bin:
	$(MOCHA) $(MOCHA_FLAGS) \
		opt/test/bin/models

test-app: test-app-pre
	$(MOCHA_PHANTOMJS) $(MOCHA_FLAGS) \
		opt/test/app/index.html

test-app-pre:
	@bin/engine build opt/test/app/index.js > opt/test/app/build.js

data-create:
	bin/models create order --file opt/models/orders
	bin/models create product --file opt/models/products

data-remove:
	bin/models remove order
	bin/models remove product

.PHONY: test
