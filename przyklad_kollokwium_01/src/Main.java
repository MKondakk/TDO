public class Main {
    public static void main(String[] args) {
        while (true) {
            System.out.println(System.getenv("MESSAGE"));
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
