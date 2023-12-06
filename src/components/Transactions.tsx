import  Page from '@/components/transactions/page'
import  Container  from '@/components/ui/container'

function TaskPage() {


  return (
      <Container>
          <div className="md:hidden">
              <img
                  src="/examples/tasks-light.png"
                  width={1280}
                  height={998}
                  alt="Playground"
                  className="block dark:hidden"
              />
              <img
                  src="/examples/tasks-dark.png"
                  width={1280}
                  height={998}
                  alt="Playground"
                  className="hidden dark:block"
              />
          </div>
          <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <div className="flex items-center justify-between space-y-2">
                  <div>
                      <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                      <p className="text-muted-foreground">
                          Here&apos;s a list of your transactions for this month!
                      </p>
                  </div>
              </div>
          </div>
          <Page/>
      </Container>
  );
}

export default TaskPage;