import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Award, Badge, Trophy, TrophyIcon } from "lucide-react";

type Props = {
    accuracy: number
};

const ResultsCard = ({ accuracy }: Props) => {
    return (
        <Card className="md:col-span-7">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">

                <CardTitle className="text-2xl font-bold"> Status </CardTitle>
                <Award />

            </CardHeader>

            <CardContent className="flex flex-col items-center justify-center h-3/5">

                {accuracy > 70 ? (
                    <>
                        <img src="/Winners.svg" alt="Winners" className="mb-4 w-52 h-52" />
                        <TrophyIcon className="mr-4" stroke="gold" size={50} />
                        <div className="flex flex-col text-2xl font-semibold text-yellow-400">
                            <span>Congratulations on passing  Quiz! 🎉</span>
                            <span className="text-sm text-center text-black opacity-50">
                                {"> 70% "}
                            </span>
                        </div>
                    </>
                ) :

                    accuracy > 50 ? (
                        <>



                            <Badge className="mr-4" stroke="silver" size={50} />
                            <div className="flex flex-col text-2xl font-semibold text-gray-500"></div>
                            <span>You did a great job! Let's aim to do even better next time!</span>
                            <span className="text-sm text-center text-black opacity-50">
                                {"> 50% "}
                            </span>

                        </>
                    ) : (
                        <>
                            <Trophy className='mr-4' stroke='gray' size={50} />
                            <div className='flex flex-col text-2xl font-semibold text-yellow-400'>
                                <span>Nice try</span>
                                <span className='text-sm text-center text-black opacity-50'>
                                    {"> 0% accuracy "}
                                </span>
                            </div>
                        </>
                    )
                }

            </CardContent>

        </Card>
    )
}

export default ResultsCard