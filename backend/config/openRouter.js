
// const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions"

// const model = "deepseek/deepseek-chat"

// export const generateResponse = async (prompt) => {
//     const res = await fetch(openRouterUrl, {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             model: model,
//             messages: [
//                 {
//                     role: "system",
//                     content: "you must return ONLY valid raw JSON"
//                 },
//                 {
//                     role: 'user',
//                     content: prompt,
//                 },
//             ],
//             temperature: 0.2
//         }),
//     });

//     if (!res.ok) {
//         const err = await res.text()
//         throw new Error("openRouter err" + err)
//     }
//     const data = await res.json()
//     return data?.choices?.[0]?.message?.content || "";
// }

const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions"

const model = "deepseek/deepseek-chat"

export const generateResponse = async (prompt) => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 120000) // 2 min hard limit

    try {
        const res = await fetch(openRouterUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: "system",
                        content: "you must return ONLY valid raw JSON"
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                temperature: 0.2
            }),
            signal: controller.signal
        });

        clearTimeout(timeout)

        if (!res.ok) {
            const err = await res.text()
            console.error("🔴 OpenRouter returned error:", res.status, err)
            throw new Error("openRouter err " + err)
        }

        const data = await res.json()
        return data?.choices?.[0]?.message?.content || "";

    } catch (error) {
        clearTimeout(timeout)

        if (error.name === 'AbortError') {
            console.error("🔴 OpenRouter request timed out after 2 minutes")
            throw new Error("AI request timed out, please try again")
        }

        console.error("🔴 Fetch to OpenRouter failed:", error.message)
        throw error
    }
}