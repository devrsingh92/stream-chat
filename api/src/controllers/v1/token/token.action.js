import dotenv from 'dotenv';
import md5 from 'md5';
import { StreamChat } from 'stream-chat';

dotenv.config();

// exports.token = async (req, res) => {
exports.token = async (req, res) => {
    // console.log('req.body', req.body);
	// return;
    try {
        const data = req.body;

        let apiKey;
        let apiSecret;

        if (process.env.STREAM_URL) {
            [apiKey, apiSecret] = process.env.STREAM_URL.substr(8)
                .split('@')[0]
                .split(':');
        } else {
            apiKey = process.env.STREAM_API_KEY;
            apiSecret = process.env.STREAM_API_SECRET;
        }

        const client = new StreamChat(apiKey, apiSecret);

        const user = Object.assign({}, data, {
            id: md5(data.username),
            // id: "622cb0269f37df10155b935b",
            role: 'user',
            image: `https://ui-avatars.com/api/?name=${data.username}&size=192&background=000000&color=6E7FFE&length=1`,
        });
        // console.log("user", user); return;
        const token = client.createToken(user.id);
        // await client.updateUsers([user]);
        await client.updateUsers([user]);

        res.status(200).json({ user, token, apiKey });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
