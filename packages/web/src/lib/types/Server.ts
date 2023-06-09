export type LinksReturn = HtmlLink[];
export type LinksFunction = () => LinksReturn;

export type HtmlLink = {
    href: string;
    rel: string;
    type?: string;
};

export type MetaReturn = HtmlMeta[];
export type MetaFunction = () => MetaReturn;

export type HtmlMeta = {
    name?: string;
    content: string;
    property?: string;
};

export type ScriptsReturn = HtmlScript[];
export type ScriptsFunction = () => ScriptsReturn;

export type HtmlScript = {
    src: string;
    type?: string;
    async?: boolean;
    defer?: boolean;
};
