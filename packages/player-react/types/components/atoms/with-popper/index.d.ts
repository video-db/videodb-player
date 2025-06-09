import React from "react";
interface CustomPopperProps {
    popperText?: string;
    isPopperActive?: boolean;
    className?: string;
    children: React.ReactNode;
}
declare const CustomPopper: React.FC<CustomPopperProps>;
export default CustomPopper;
