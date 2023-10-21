"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../auth/auth";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import Parallax from "./Parallax";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Heart, Instagram, MapPin, Twitter } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";

const UnsplashImageFetcher: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [filteredImages, setFilteredImages] = useState<any[]>([]);
  const [openImageIndices, setOpenImageIndices] = useState<boolean[]>([]);

  useEffect(() => {
    getAccessToken()
      .then((accessToken) => {
        axios
          .get("https://api.unsplash.com/photos/random", {
            params: {
              count: 18,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setImages(response.data);
          })
          .catch((error) => {
            console.error("Error fetching images from Unsplash:", error);
          });
      })
      .catch((error) => {
        console.error("Error obtaining access token:", error);
      });
  }, []);

  useEffect(() => {
    console.log("Fetched Unsplash Images:", images);
  }, [images]);

  const handleSearch = (query: string) => {
    const filteredArr = images.filter((image) => {
      return image.alt_description.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredImages(filteredArr);
  };

  const handleImageClick = (index: number) => {
    const newOpenImageIndices = [...openImageIndices];
    newOpenImageIndices[index] = !openImageIndices[index];
    setOpenImageIndices(newOpenImageIndices);
  };

  return (
    <div className="flex flex-col gap-20">
      <Input
        type="text"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Search..."
        className="text-neutral-950 w-[200px] lg:w-[400px] mx-auto"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 sm:mt-16 w-full justify-items-center sm:justify-around gap-y-10 gap-x-10">
        {(filteredImages.length > 0 ? filteredImages : images).map(
          (image, index) => (
            <div
              key={image.id}
              className="w-full sm:w-[300px] lg:w-[400px] 2xl:w-[450px]"
            >
              <Parallax offset={25}>
                <div className="overflow-hidden bg-neutral-950 relative">
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      src={image.urls.small}
                      width={800}
                      height={400}
                      alt={image.description}
                      className="w-full h-full object-cover mx-auto transition-all duration-500 hover:scale-110 hover:opacity-60"
                      onClick={() => handleImageClick(index)}
                    />
                  </AspectRatio>
                </div>

                <div className="flex justify-between w-11/12 mx-auto py-3">
                  <div className="flex flex-col">
                    <span className="text-lg">{image.user.name}</span>
                    <span className="italic text-neutral-400">
                      @{image.user.username}
                    </span>
                  </div>
                  <div className="flex space-x-2 text-lg items-center">
                    <Heart color="red" className="pr-2" />
                    {image.likes}
                  </div>
                </div>
              </Parallax>
              <Dialog
                open={openImageIndices[index]}
                onOpenChange={() => handleImageClick(index)}
              >
                <DialogContent className="bg-neutral-800">
                  <div className="mx-auto sm:w-[300px] lg:w-[400px] 2xl:w-[450px] flex flex-col bg-red-400 justify-between relative inset-0">
                    <AspectRatio ratio={4 / 3}>
                      <Image
                        src={image.urls.small}
                        width={800}
                        height={400}
                        alt={image.description}
                        className="w-full h-full object-cover mx-auto"
                      />
                    </AspectRatio>
                    <div className="flex flex-col gap-2 py-3">
                      {image.location.name ? (
                        <>
                          <span className="flex">
                            <MapPin color="red" className="pr-2" />
                            {image.location.name}
                          </span>
                          <span className="text-lg text-neutral-400 italic">
                            {image.alt_description}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg text-neutral-400 italic">
                          {image.alt_description}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-lg font-bold flex gap-3 items-center">
                      <Avatar>
                        <AvatarImage
                          src={image.user.profile_image.small}
                          alt={image.user.first_name}
                        />
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-lg">{image.user.name}</span>
                        <div className="flex gap-3 text-sm font-normal">
                          <span className="flex italic text-neutral-400">
                            @{image.user.username}
                          </span>
                          |
                          <span className="flex items-center gap-1 italic text-neutral-400">
                            <Instagram size={15} />
                            <span>{image.user.social.instagram_username}</span>
                          </span>
                          {image.user.social.twitter_username ? (
                            <>
                              |
                              <span className="flex items-center gap-1 italic text-neutral-400">
                                <Twitter size={15} />
                                <span>
                                  {image.user.social.twitter_username}
                                </span>
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 text-lg items-center">
                      <Heart color="red" className="pr-2" />
                      {image.likes}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UnsplashImageFetcher;
