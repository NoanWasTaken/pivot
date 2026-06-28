"use client";
import React from "react";
import Image from "next/image";

export type GameData = {
  appid: number;
  name: string;
  header_image: string;
  tier: string | null;
  isNative: boolean | null;
};

export default function Game({ game }: { game: GameData }) {
  const imgSrc = game.header_image;

  return (
    <div className="game card">
      <Image src={imgSrc!} alt={game.name} width={460} height={215} />
      <h2>{game.name}</h2>
      <p>{game.appid}</p>
      {game.isNative === true ? <p>Native</p> : <p>{game.tier}</p>}
    </div>
  );
}
