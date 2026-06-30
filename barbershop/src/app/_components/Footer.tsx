import { Card, CardContent } from "../_components/ui/card";
const Footer = () => {
  return (
    <>
      <footer className="mt-5">
        <Card className="p-5 rounded-none">
          <CardContent>
            <p className="text-sm">&copy; Copyright Barbershop.</p>
          </CardContent>
        </Card>
      </footer>
    </>
  );
};

export default Footer;
