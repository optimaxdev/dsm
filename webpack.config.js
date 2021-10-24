module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/dsm-effects.js",
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
        ],
    },
    // Other options...
};