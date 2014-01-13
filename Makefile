MOCHA = ./node_modules/.bin/mocha
MOCHA_FLAGS = --reporter spec

boot:
	@node lib

test: \
	test-lib 	\
	test-bin

test-lib:
	$(MOCHA) $(MOCHA_FLAGS) \
		opt/test/lib/models \
		opt/test/lib/static	\
		opt/test/lib/routes

test-bin:
	$(MOCHA) $(MOCHA_FLAGS) \
		opt/test/bin/models

test-app:
	$(MOCHA) $(MOCHA_FLAGS) \
		opt/test/app/models

data-create:
	bin/models create order --file opt/models/orders		\
	bin/models create product --file opt/models/products

data-remove: 
	bin/models remove order		\
	bin/models remove product

.PHONY: test
