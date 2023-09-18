import React from "react";
import Head from 'next/head';
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";


const ListBox = ({ items }) => (
    <ol className={"list-decimal list-inside"}>
        {
            items.length > 0
                ? items.map((item, index) => <li key={index}>{item}</li>)
                : <span className={"text-xs"}>No data to display</span>
        }
    </ol>
)

export default function Home() {

    const [data, setData] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const [title, setTitle] = React.useState("")
    const [objectives, setObjectives] = React.useState([])
    const [actions, setActions] = React.useState([])
    const [accountsInfluenced, setAccountsInfluenced] = React.useState([])
    const [assets, setAssets] = React.useState([])
    const [impact, setImpact] = React.useState("")
    const [error, setError] = React.useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            let response = await fetch("/api/generate", {
                method: 'POST',
                body: JSON.stringify({ description: data }),
                headers: {
                    "Content-type": "application/json"
                }
            })

            if (response.ok) {
                response = await response.json()
                setTitle(response.result.title)
                setObjectives(response.result.objectives)
                setActions(response.result.actions)
                setAccountsInfluenced(response.result.accountsInfluenced)
                setAssets(response.result.assets)
                setImpact(response.result.impact)
                toast.success("Newsletter Content Generated")
            } else {
                response = await response.json()
                toast.error(response.error.message)
            }
        } catch (error) {
            console.error(error.message)
            toast.error(error.message)
        }
        setLoading(false)
    }

    const downloadContentAsTextFile = () => {
        const content = `
        Title: ${title}

        Objectives:
        ${objectives.join('\n  ')}

        Actions:
        ${actions.join('\n  ')}

        Accounts Influenced:
        ${accountsInfluenced.join('\n  ')}

        Assets:
        ${assets.join('\n  ')}

        Impact:
        ${impact}
        `;

        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'newsletter_content.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <Head>
                <title>CME Newsletter Builder</title>
                <meta name="description" content="Generate CME newsletter content based on the input data" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={"bg-white-100"}>
                <div className={"border-b-2 text-4xl text-center py-5 bg-purple-700 text-zinc-50"}>
                    CME Newsletter Builder
                </div>
                <div className={"max-w-5xl mx-auto h-[calc(100vh-146px)]"}>
                    <div className={"md:grid md:grid-cols-2 gap-4"}>
                        <div className={"p-5"}>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor={"data-input"} className={"text-lg font-bold text-zinc-500"}>
                                    Provide Data for Newsletter:
                                </label>
                                <textarea
                                    rows={10}
                                    onChange={(e) => setData(e.target.value)}
                                    value={data}
                                    id={"data-input"}
                                    placeholder={"paste here..."}
                                    className={"w-full p-5 mt-3 border-2 border-purple-500 rounded-md resize-none outline-0"}
                                />
                                <div className={"text-right mt-2"}>
                                    <button
                                        className={"inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm rounded-md text-white bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 transition ease-in-out duration-150 disabled:cursor-not-allowed mr-2"}
                                        type={"button"}
                                        onClick={downloadContentAsTextFile}
                                    >
                                        Download Content
                                    </button>
                                    <button
                                        className={"inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm rounded-md text-white bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 transition ease-in-out duration-150 disabled:cursor-not-allowed"}
                                        type={"submit"}
                                        disabled={loading}
                                    >
                                        {loading ? "Generating..." : "Generate"}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className={"p-5 h-full max-h-[calc(100vh-146px)] overflow-y-scroll"}>
                            
							<div>
                                <h4>Title</h4>
                                <p>{title ? title : <span className={"text-xs"}>No data to display</span>}</p>
                            </div>
                            <div className={"mt-5"}>
                                <h4>Objectives</h4>
                                <ListBox items={objectives} />
                            </div>
                            <div className={"mt-5"}>
                                <h4>Actions</h4>
                                <ListBox items={actions} />
                            </div>
                            <div className={"mt-5"}>
                                <h4>Accounts Influenced</h4>
                                <ListBox items={accountsInfluenced} />
                            </div>
                            <div className={"mt-5"}>
                                <h4>Assets</h4>
                                <ListBox items={assets} />
                            </div>
                            <div className={"mt-5"}>
                                <h4>Impact</h4>
                                <p>{impact ? impact : <span className={"text-xs"}>No data to display</span>}</p>
                            </div>
                        </div>
                    </div>
                </div>
				<div className={"flex justify-between max-w-5xl mx-auto items-center py-4 border-t-2 px-5"}>
    			<div className={"text-sm uppercase text-purple-500 font-bold text-center flex-grow"}>
        			powered by CME Marketing
    			</div>
    			<Link href={"https://github.com/pharavi"} target={"_blank"}>
        		<img src={"/github-mark.svg"} alt={"github-repo"} className={"w-7 h-7"}/>
    			</Link>
					</div>
            </main>
            <Toaster />
        </>
    )
}
