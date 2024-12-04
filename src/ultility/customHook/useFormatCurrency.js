import { useState } from "react";

export function useFormatCurrency(locale = 'vi-VI', currency = 'VND') {
    const [formatter, setFormatter] = useState(() => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
        });
    });

    return {
        formatCurrency: (number) => formatter.format(number),
        updateFormatter: (newLocale, newCurrency) => {
            setFormatter(new Intl.NumberFormat(newLocale, {
                style: 'currency',
                currency: newCurrency,
            }));
        },
    };
}
