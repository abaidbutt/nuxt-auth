import { users } from "../dummy/data.json"
export default defineEventHandler((event) => {
    console.log('New request: ' + getRequestURL(event), users)
})
