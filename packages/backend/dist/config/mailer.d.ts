export declare function sendMail({ email, text, html, subject }: {
    email: string;
    text: string;
    subject: string;
    html: string;
}): Promise<void>;
