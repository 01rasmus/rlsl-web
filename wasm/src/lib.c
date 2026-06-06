#include <emscripten/emscripten.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>

#include <token/rlsl_token.h>
#include <ast/rlsl_ast.h>
#include <tools/rlsl_str.h>

EMSCRIPTEN_KEEPALIVE const char* rlsl_validate(const char* source) {

    rlsl_str_stream_t stream = rlsl_str_stream_create(RLSL_STR_STREAM_MEMORY);
    char* temp_str = NULL;

    rlsl_str_stream_printf(&stream, "{\"errors\": [");

    //transpile
    rlsl_tokenizer_result_t* res = rlsl_token_tokenize_string(source, "web");
    if(res->error_count > 0) {
        for(int64_t i = 0; i < res->error_count; i++) {
            rlsl_error_print(&res->errors[i], source, "web", RLSL_ERROR_OUTPUT_TYPE_JSON, &temp_str);

            if(i != 0) {
                rlsl_str_stream_printf(&stream, ", ");
            }
            rlsl_str_stream_printf(&stream, temp_str);

            free(temp_str);
            temp_str = NULL;
        }
        goto done;
    }

    rlsl_ast_module_t module_ast = rlsl_ast_parse_tokens(res->tokens, res->token_count);
    if(module_ast.error_count > 0) {
        for(int64_t i = 0; i < module_ast.error_count; i++) {
            rlsl_error_print(&module_ast.errors[i], source, "web", RLSL_ERROR_OUTPUT_TYPE_JSON, &temp_str);

            if(i != 0) {
                rlsl_str_stream_printf(&stream, ", ");
            }
            rlsl_str_stream_printf(&stream, temp_str);

            free(temp_str);
            temp_str = NULL;
        }
        goto done;
    }

done:
    rlsl_str_stream_printf(&stream, "]}");
    return rlsl_str_stream_raw(&stream);
}

EMSCRIPTEN_KEEPALIVE void rlsl_free_string(char* str) {
    free(str);
}