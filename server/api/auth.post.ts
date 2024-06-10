import { users } from "../dummy/data.json";

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event);

    if (!username || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Username and password are required'
        });
    }

    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
        if (existingUser.password === password) {
            return { ...existingUser, token: existingUser.id + "_" + existingUser.username }; // Return user with a token if authentication is successful
        } else {
            throw createError({
                statusCode: 401,
                statusMessage: 'Incorrect password'
            });
        }
    }

    // Create new user if username doesn't exist
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);

    return { ...newUser, token: newUser.id + "_" + newUser.username };
});
