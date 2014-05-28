SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)

boot:
	@supervisor \
	  --ignore srv,opt \
	  --extensions js,json \
	  	lib

test: export NODE_ENV=test
test:
	@mocha \
	  --reporter spec
		opt

.PHONY: boot test
