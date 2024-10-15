"use client"

import { Button } from '@/components/ui/button'; // Adjust the import path according to your structure
import { Link2Icon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';

type Props = {
    questionboardId: string; // ID of the question board to generate the link
    questionboardTopic: string; // Topic of the question board (or any other relevant data for the link)
};

export const CopyEventLinkButton = ({ questionboardId, questionboardTopic }: Props) => {
    const getEventLink = (id: string) => {
        return `${window.location.origin}/myquestionboard/${id}`; // Create a link based on your routing
    };

    const handleCopy = () => {
        const link = getEventLink(questionboardId);
        copy(link);

        toast.success("Event link copied to clipboard!", {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            theme: "light",
        });
    };



    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={handleCopy}
                        variant="outline" // Choose a variant that fits your design
                        className="rounded-full"
                    >
                        <Link2Icon className="w-4 h-4" />
                    </Button>
                </TooltipTrigger>

                <TooltipContent className="bg-black text-white text-sm">
                    Copy link to clipboard
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
