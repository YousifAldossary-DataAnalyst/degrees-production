import { ContainerScroll } from "@/components/global/container-scroll-animation";
import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
import { Button } from "@/components/ui/button";
import { clients, products } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/lib/constants";
import { stripe } from "@/lib/stripe";
import clsx from "clsx";
import { Check, CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroParallax } from "@/components/global/connect-parallax";
import { LampComponent } from "@/components/global/lamp";
import { CardItem, CardContainer, CardBody } from "@/components/ui/3d-card";

export default async function Home() {
  const prices = await stripe.prices.list({
    product: process.env.NEXT_DEGREES_PRODUCT_ID,
    active: true,
  });

  return (
    <>
      <section className="h-fit w-full pt-36 relative flex item-center justify-center flex-col overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 top-0 
        dark:bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] z-[-1]"
        ></div>

        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="xl:text-[300px] font-bold text-center md:text-[200px] sm:text-[100px]">
            Degrees
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-70px] gap-6">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col gap-6">
                <Button
                  size={"lg"}
                  className="p-8 mb-8 md:mb-0 text-2xl w-full bg-primary/90 sm:w-fit border-t-2 rounded-full border-[#4D4D4D] dark:bg-[#1F1F1F] dark:hover:bg-white hover:bg-primary group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white dark:from-neutral-500 dark:to-neutral-600  md:text-center font-sans dark:group-hover:bg-gradient-to-r dark:group-hover:from-black dark:goup-hover:to-black bg-gradient-to-r group-hover:from-white group-hover:to-white">
                    <Link href={"/agency"}>Start For Free Today</Link>
                  </span>
                </Button>
                <h2 className="text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  Run Your Agency in One Place
                </h2>
              </div>
            }
          />
        </div>
        
        <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
      </section>
      {/* <InfiniteMovingCards
        className="md:mt-[18rem] mt-[-100px]"
        items={clients}
        direction="right"
        speed="slow"
      /> */}
      <section className="h-[250vh]">
        <HeroParallax products={products}></HeroParallax>
      </section>
      <section className="mt-[-500px]">
        <LampComponent />
        <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 -mt-72">
          {prices.data.map((card) => (
            <CardContainer key={card.nickname} className="inter-var ">
              <CardBody
                className={clsx(
                  "bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border",
                  {
                    "border-2 border-primary":
                      card.nickname === "Unlimited SaaS",
                  }
                )}
              >
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white "
                >
                  {card.nickname}
                  <h2 className="text-6xl ">
                    {card.unit_amount && card.unit_amount / 100} 
                  </h2>
                </CardItem>
                <CardItem
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  {
                    pricingCards.find((c) => c.title === card.nickname)
                      ?.description
                  }
                  <ul className="my-4 flex flex-col gap-2">
                    {pricingCards
                      .find((c) => c.title === "Unlimited SaaS")
                      ?.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <Check />
                          <p>{feature}</p>
                        </li>
                      ))}
                  </ul>
                </CardItem>
                <div className="flex justify-between items-center mt-8">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                  >
                    Subscribe →
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-primary dark:bg-white dark:text-black text-white text-xs font-bold"
                  >
                    <Link href={`/agency?plan=${card.id}`}>
                      Get Started Now
                    </Link>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}

          <CardContainer className="inter-var ">
            <CardBody
              className=
                "bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border"
            >
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white "
              >
                Starter
                <h2 className="text-6xl ">
                  0 SAR
                </h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                 {
                    pricingCards.find((c) => c.title === "Starter")
                      ?.description
                  }
                <ul className="my-4 flex flex-col gap-2">
                  {pricingCards
                    .find((c) => c.title === "Starter")
                    ?.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <Check />
                        <p>{feature}</p>
                      </li>
                    ))}
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  Try now →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-primary dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  <Link href={`/agency`}>Get Started Now</Link>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </section>
    </>
  );
}
