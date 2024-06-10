import { users } from "../dummy/data.json";
interface User {
    password: string;
    username: string;
    token: string;
}
export default defineEventHandler((event) => {
    const { token }: User = getQuery(event);
    let userId = parseInt(token.split('_')[0]);
    const user = users.find(user => user.id === userId);

    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Username not found'
        });
    }

    return user;
});
