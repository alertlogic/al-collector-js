.PHONY: test all compile clean

PROTOC := $(shell which pbjs)

JS_PROTOS = alc_health.piqi_pb.js common_proto.piqi_pb.js dict.piqi_pb.js host_metadata.piqi_pb.js 


all: compile 

%_pb.js: %.proto
	$(PROTOC) -t static-module -w commonjs -o $@ $< 

compile: $(JS_PROTOS)


clean:
	rm -rf *.js

