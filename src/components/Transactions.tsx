import  Page from '@/components/transactions/page'
import  Container  from '@/components/ui/container'
import { useRecoilValue } from 'recoil';
import { userEmailState } from '@/store/selectors/userEmailSelector';

function TaskPage() {

    const userEmail = useRecoilValue(userEmailState);

  return (
      <Container>
          <div className="md:hidden">
              <img
                  src="/advertlight.jpg"
                  width={1280}
                  height={998}
                  alt="Playground"
                  className="block dark:hidden"
              />
              <img
                  src="/advertdark.png"    
                  width={1280}
                  height={998}
                  alt="Playground"  
                  className="hidden dark:block"
              />
          </div>
          <div className="hidden h-full flex-1 flex-col space-y-8 pt-8 px-8 md:flex">
              <div className="flex items-center justify-between space-y-2">
                  <div>
                      <h2 className="text-2xl font-bold tracking-tight">
                        {userEmail ? `Welcome back! ${userEmail}` : 'You are not logged in'}
                      </h2>
                      <p className="text-muted-foreground">
                          {userEmail ? "Here's a list of your transactions for this month!" : 'Please Login to view your transactions'}
                      </p>
                  </div>
              </div>
          </div>
          <Page/>
      </Container>
  );    
}

export default TaskPage;
