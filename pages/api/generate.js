import {Configuration, OpenAIApi} from 'openai'

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export default async function (req, res) {

	const {description} = req.body

	if (!configuration.apiKey) {
		return res.status(500).json({
			error: {
				message: "api key missing!"
			}
		})
	}

	if (description.trim().length === 0) {
		return res.status(400).json({
			error: {
				message: "job description cannot be empty"
			}
		})
	}

	try {
		const completion = await openai.createCompletion({
			model: "text-davinci-003",
			temperature: 0.7,
			max_tokens: 2000,
			prompt: getPrompt(description)
		})

		let data = JSON.parse(completion.data.choices[0].text)
		return res.json({result: data})

	} catch (error) {
		console.log(error)
		return res.status(400).json({
			error: {
				message: error.message
			}
		})
	}
}

const getPrompt = (description) => {
    return `For the data provided below, create a structured JSON response that will help build a CME Newsletter showcasing the positive impacts of the recent marketing initiatives taken by Tech Mahindra's CME marketing team. The JSON response should be structured as follows:

{
  "title": "",
  "objectives": [""],
  "actions": [""],
  "accountsInfluenced": [""],
  "assets": [""],
  "impact": ""
}

Please follow the guidelines below for each section:

- "title": Provide a crisp and engaging title suitable for a business newsletter, summarizing the overall impact of the marketing initiatives.
- "objectives": List the main objectives, focusing on highlighting the positive impact of the marketing initiatives. Ensure the language is business-appropriate and aligned with the objectives of a CME Newsletter.
- "actions": Mention the actions taken to achieve the objectives, ensuring to make the language exciting and inspiring.
- "accountsInfluenced": Specify the names of the client or business accounts influenced, based on the data provided in the inputs.
- "assets": Detail the creatives built for the initiative mentioned in the inputs, including any notable highlights or features.
- "impact": Describe the overall impact of the actions undertaken, emphasizing how they have enhanced brand recognition and/or customer relations for Tech Mahindra. Be sure to highlight any revenue impacts and convey the high level of contribution the CME marketing team has made. Include any data available in the inputs to demonstrate the successful impact of their actions in the Communications, Media, and Entertainment industry globally.

Data:
${description}
`;
};
