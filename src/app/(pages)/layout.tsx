
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
          <main className="bg-gray-50 min-h-screen mx-auto pb-20">{children}</main>
  );
}
