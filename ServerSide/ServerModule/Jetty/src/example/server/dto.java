package dtoa;
 
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
 
@XmlRootElement
public class Employee { 
 private String name = ""; 
 private int age = 0; 
 private String department = ""; 
 private Address address = null; 
 private double wage = 0;
 
 public String getName() {
  return name;
 }
 public void setName(String name) {
  this.name = name;
 }
 public int getAge() {
  return age;
 }
 public void setAge(int age) {
  this.age = age;
 }
 public String getDepartment() {
  return department;
 }
 public void setDeparment(String department) {
  this.department = department;
 }
 public Address getAddress() {
  return address;
 }
 public void setAddress(Address address) {
  this.address = address;
 } 
 public double getWage() {
  return wage;
 }
 public void setWage(double wage) {
  this.wage = wage;
 }
 @Override
 public String toString() {
  return "Employee [name=" + name + ", age=" + age + ", department="
    + department + ", address=" + address + ", wage=" + wage
    + "]";
 } 
}
 
package dto;
 
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
 
@XmlRootElement
public class Address {
 private String street ="";
 private String city ="";
 private String state ="";
 private int zip = 0;
 
 public String getStreet() {
  return street;
 }
 public void setStreet(String street) {
  this.street = street;
 }
 public String getCity() {
  return city;
 }
 public void setCity(String city) {
  this.city = city;
 }
 public String getState() {
  return state;
 }
 public void setState(String state) {
  this.state = state;
 }
 public int getZip() {
  return zip;
 }
 public void setZip(int zip) {
  this.zip = zip;
 }
 @Override
 public String toString() {
  return "Address [street=" + street + ", city=" + city + ", state="
    + state + ", zip=" + zip + "]";
 }
}
 
package dto;
 
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
 
@XmlRootElement(name = "student")
public class Student {
    private int id;
    private String firstName;
    private String lastName;
    private int age;
 
    public Student() {
    }
 
    public Student(String fname, String lname, int age, int id) {
        this.firstName = fname;
        this.lastName = lname;
        this.age = age;
        this.id = id;
    }
 
    @XmlElement
    public void setFirstName(String fname) {
        this.firstName = fname;
    }
 
    public String getFirstName() {
        return this.firstName;
    }
    @XmlElement
    public void setLastName(String lname) {
        this.lastName = lname;
    }
 
    public String getLastName() {
        return this.lastName;
    }
 
    @XmlElement
    public void setAge(int age) {
        this.age = age;
    }
 
    public int getAge() {
        return this.age;
    }
 
    @XmlAttribute
    public void setId(int id) {
        this.id = id;
    }
 
    public int getId() {
        return this.id;
    }
 
    @Override
    public String toString() {
        return new StringBuffer(" First Name : ").append(this.firstName)
                .append(" Last Name : ").append(this.lastName)
                .append(" Age : ").append(this.age).append(" ID : ")
                .append(this.id).toString();
    }
}