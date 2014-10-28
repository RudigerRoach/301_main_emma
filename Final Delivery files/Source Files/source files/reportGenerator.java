/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Dieter
 */
public abstract class reportGenerator
{
    //
    int [][] scores = null;
    String [] imgNames = null;
    
    public reportGenerator(int [][] _scores, String [] _imgNames)
    {
        scores = _scores;
        imgNames = _imgNames;
    }
    
    abstract public report generateReport();

}
