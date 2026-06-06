cmake_minimum_required(VERSION 3.20)
project(rlsl_web C)
set(CMAKE_C_STANDARD 11)

# add rlsl
add_subdirectory("${CMAKE_CURRENT_SOURCE_DIR}/../rlsl/" "${CMAKE_CURRENT_BINARY_DIR}/rlsl")

# directories
set(OBJ_DIR "${OUT_DIR}/obj")
set(SRC_DIR "${CMAKE_CURRENT_SOURCE_DIR}/src")

# source
file(GLOB_RECURSE RLSL_WEB_SRC "${SRC_DIR}/*.c")

# binaries
set(RLSL_WEB "rlsl_web")
add_executable(${RLSL_WEB} ${RLSL_WEB_SRC})

# incudes
target_include_directories(${RLSL_WEB} PRIVATE ${SRC_DIR})

target_link_libraries(${RLSL_WEB} rlsl)

if(EMSCRIPTEN)
    target_link_options(${RLSL_WEB} PRIVATE
        "SHELL:-s WASM=1"
        "SHELL:-s MODULARIZE=1"
        "SHELL:-s ENVIRONMENT=web,worker"
        "SHELL:-s EXPORT_NAME='createRlslModule'"
        "SHELL:-s EXPORTED_FUNCTIONS=['_rlsl_validate','_rlsl_free_string']"
        "SHELL:-s EXPORTED_RUNTIME_METHODS=['cwrap','ccall','UTF8ToString']"
    )

    set_target_properties(${RLSL_WEB} PROPERTIES SUFFIX ".js")
endif()