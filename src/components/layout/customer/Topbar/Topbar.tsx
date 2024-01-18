import { Container } from '@/components/layout/customer';
import { Button } from '@/components/forms';

export function Topbar() {
  return (
    <div className="h-14 shrink-0 bg-warning">
      <Container className="h-full">
        <div className="flex h-full items-center justify-center gap-x-2.5">
          <p className="text-xs text-success sm:text-sm md:text-xl lg:text-2xl">
            Start your online business with Fresher Choice
          </p>
          <Button color="light" className="py-2 text-xs sm:text-sm md:text-xl">
            Join Now
          </Button>
        </div>
      </Container>
    </div>
  );
}
