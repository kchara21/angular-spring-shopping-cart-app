import java.nio.charset.Charset;
import java.util.Random;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        // Primer Alogirtmo
        System.out.println("Codigo Aleatorio: " + claveAleatoria());

        // Segundo Algoritmo
        euclides();

    }



    /*
    Escribir una función que genere una clave aleatoria sin usar regex, con las siguientes
    características.
    - Debe tener entre 8 y 15 caracteres
    - Debe contener al menos 2 mayúscula
    - Debe contener al menos 2 minúscula
    - Debe contener al menos 2 dígitos
    */
    public static String claveAleatoria(){
        double longitud = Math.floor(Math.random() * (15 - 8) + 8);
        String NumericMayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String NumericMinus = "abcdefghijklmnopqrstuvwxyz";
        String SpecialCharacters = "#<(t[t‰t¡=!";
        String numbers = "0123456789";
        String theAlphaNumericS = NumericMayus+NumericMinus+numbers+SpecialCharacters;
        StringBuilder builder = new StringBuilder((int) longitud);


        // Debe contener al menos 1 caracter especial
        while(builder.length()<1){

            // generate numeric
            int myindex
                    = (int)(SpecialCharacters.length()
                    * Math.random());

            // add the characters
            builder.append(SpecialCharacters
                    .charAt(myindex));
        }

        // Debe contener al menos 1 mayuscula
        while (builder.length()<2){

            // generate numeric
            int myindex
                    = (int)(NumericMayus.length()
                    * Math.random());

            // add the characters
            builder.append(NumericMayus
                    .charAt(myindex));
        }

        // Debe contener al menos 1 minúscula
        while (builder.length()<3){

            // generate numeric
            int myindex
                    = (int)(NumericMinus.length()
                    * Math.random());

            // add the characters
            builder.append(NumericMinus
                    .charAt(myindex));
        }

        // Ubicar los demas caracteres aleatorios para completar la longitud
        while (builder.length()<longitud){
            // generate numeric
            int myindex
                    = (int)(theAlphaNumericS.length()
                    * Math.random());

            // add the characters
            builder.append(theAlphaNumericS
                    .charAt(myindex));
        }

        return builder.toString();
    }


    /* Elabore un algoritmo, usando el método de Euclides o divisiones sucesivas,
    que permita transformar una cantidad ingresada en base 10 a su correspondiente en base
    y (y es ingresado por teclado)*/

    public static void euclides(){
        int dividendo,divisor,cociente,resto;

        Scanner obj = new Scanner(System.in);
        System.out.println("Ingrese primer numero: ");
        int a = obj.nextInt();
        System.out.println("Ingrese segundo numero: ");
        int b = obj.nextInt();

        System.out.println("\n");

        if(a>b){
            dividendo = a;
            divisor = b;
        }else{
            dividendo = b;
            divisor = a;
        }

        do{
            cociente = dividendo/divisor;
            resto = dividendo-(divisor*cociente);
            System.out.println("\n");
            System.out.println("Cociente: "+cociente);
            System.out.println("Resto: "+resto);
            dividendo = divisor;
            divisor = resto;
        }while (resto!=0);
        System.out.println("Maximo como un divisor: "+dividendo);
    }

}

