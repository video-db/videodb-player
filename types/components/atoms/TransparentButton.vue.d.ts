declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & (new () => {
    $slots: S;
});
declare const __VLS_component: import("vue").DefineComponent<{}, {
    $emit: (event: "clickAction", ...args: any[]) => void;
    buttonState: string;
    defaultStateCss: string;
    activeStateCss: string;
    disabledStateCss: string;
    $props: {
        readonly buttonState?: string | undefined;
        readonly defaultStateCss?: string | undefined;
        readonly activeStateCss?: string | undefined;
        readonly disabledStateCss?: string | undefined;
    };
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
declare function __VLS_template(): {
    default?(_: {}): any;
};
