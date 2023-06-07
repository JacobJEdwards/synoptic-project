import HtmlWebpackPlugin = require("html-webpack-plugin");
export const mode: string;
export namespace entry {
    const app: string;
}
export namespace output {
    const path: string;
    const publicPath: string;
    const filename: string;
}
export namespace resolve {
    const extensions: string[];
    const preferRelative: boolean;
    const alias: {
        "/views": string;
        "/root.js": string;
    };
}
export namespace module {
    const rules: ({
        test: RegExp;
        exclude: RegExp;
        include: string;
        use: {
            loader: string;
            options: {
                presets: (string | {
                    targets: {
                        node: string;
                    };
                })[][];
                plugins: (string | (string | {
                    regenerator: boolean;
                })[])[];
            };
        };
    } | {
        test: RegExp;
        use: {
            loader: string;
        }[];
        exclude?: undefined;
        include?: undefined;
    })[];
}
export const plugins: HtmlWebpackPlugin[];
//# sourceMappingURL=webpack.config.d.cts.map