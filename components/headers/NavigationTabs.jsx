const navigation = [
  { name: "Arts", href: "/arts" },
  { name: "Artists", href: "/artists" },
  { name: "Share", href: "/share" },
  { name: "About", href: "/about" },
];

import Link from "next/link";
import React from "react";

const NavigationTabs = ({ classes }) => {
  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classes}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

export default NavigationTabs;
