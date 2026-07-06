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
	rm -f test/report.xml
	rm -f *.report.xml
	rm -rf ./coverage/

publish:
	npm run rel

update-overrides:
	npm run update:overrides

pb: $(PROTO_DIR)
	cd $(PROTO_DIR) && make compile

pb-clean: $(PROTO_DIR)
	cd $(PROTO_DIR) && make clean

