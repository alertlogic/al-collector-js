.PHONY: test deps all compile clean pb pb-clean 

PROTO_DIR=./proto


all: test 

deps: node_modules pb

node_modules:
	npm install

compile: deps
	npm run lint

test: compile
	npm run test
	
clean:
	rm -rf node_modules
	rm -f package-lock.json
	rm -f test/report.xml
	rm -rf ./coverage/

publish:
	npm run publish

pb: $(PROTO_DIR)
	cd $(PROTO_DIR) && make compile

pb-clean: $(PROTO_DIR)
	cd $(PROTO_DIR) && make clean

