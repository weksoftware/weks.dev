import { JSX } from "react";

export type InfoSectionProps = {
    title: string;
    description: string;
    email: string;
    website_url?: string;
    github_url?: string;
    telegram_url?: string;
}

export type LinkButtonProps = {
    url: string;
    icon: JSX.Element;
}

export type IconProps = {
    fill: string;
}