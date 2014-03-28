MOCHA  		 = ./node_modules/.bin/mocha
SUPERVISOR = ./node_modules/.bin/supervisor

MOCHA_FLAGS = \
	--reporter spec

SUPERVISOR_FLAGS = \
	--ignore public	 \
	--extensions js,json

boot:
	$(SUPERVISOR) $(SUPERVISOR_FLAGS) index

test:
	$(MOCHA) $(MOCHA_FLAGS) tests

.PHONY: test
