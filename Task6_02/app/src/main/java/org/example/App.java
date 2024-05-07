package org.example;

public class App {
    public String getGreeting() {
        return "Hello from my Java program - Author Mariia Kondak";
    }

    public static void main(String[] args) {
        System.out.println(new App().getGreeting());
    }
}
