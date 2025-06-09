declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;

type __VLS_WithTemplateSlots<T, S> = T & (new () => {
    $slots: S;
});
declare const __VLS_component: import("vue").DefineComponent<{}, {
    $emit: (event: "search-change" | "search-submit" | "setVideoErrorStatus", ...args: any[]) => void;
    videoDetails: Record<string, any>;
    $props: {
        readonly videoDetails?: Record<string, any> | undefined;
    };
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
declare function __VLS_template(): {
    controls?(_: {}): any;
};
