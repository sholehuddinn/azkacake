import jwt from 'jsonwebtoken';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyYzdkZmE0LTM4ODItNDA4Zi04OTkxLWYyOWIwODI2ODNhNSIsInVzZXJuYW1lIjoiZmFqYXIxMjMiLCJpYXQiOjE3NDk0OTIxNTQsImV4cCI6MTc0OTQ5NTc1NH0.GvKOBGwHEZ7MCWCT0fAEXFlKkdzL10_ZAo413gwAGi0'; // JWT kamu
const decoded = jwt.decode(token);

console.log(decoded);
