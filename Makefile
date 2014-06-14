SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)

boot:
	@supervisor \
	  --harmony \
	  --ignore srv,opt \
	  --extensions js,json \
	  	lib

test: export NODE_ENV=test
test:
	@mocha \
	  --harmony \
	  --reporter spec \
		opt/test

clean:
	@rm -rf node_modules

.PHONY: boot test clean
