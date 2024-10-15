"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  const { data, status } = useSession();

  console.log("data: " + data)

  console
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[300px]" >
        <CardHeader>
          <CardTitle> Welcome to KM_APP </CardTitle>
          <CardDescription>
            QuizXD is a quiz app that allows you to create and share quizz with your friends.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button onClick={() => signIn("google")} >Login with google</Button>

        </CardContent>


      </Card>
    </div>



  );
};

export default LoginPage;