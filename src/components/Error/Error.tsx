import React from "react";

import "./Error.pcss"

export default function Error({code}) {
    return <div className={'error'}>
        Я ошибка : {code}
    </div>
}
