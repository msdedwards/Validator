using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyllogismValidatorWPF
{
    public enum Mood
    {
        A,
        E,
        I,
        O
    };
    public enum Object
    {
        S,
        P,
        M
    }
    public class Proposition
    {
        public Mood Mood { get; set; }
        public Term Subject { get; set; }
        public Term Predicate { get; set; }
        public bool isNegative { get; set; }
        public bool isUniversal { get; set; }
        public bool isConclusion { get; set; }
        public string Quantifier { get; set; }
        public string Copula { get; set; }

        public Proposition(Mood mood, Term sub, Term pred, bool isConcl)
        {
            isConclusion = isConcl;
            Mood = mood;
            Subject = sub;
            Predicate = pred;
            Copula = "   is   ";
            switch (mood)
            {
                case Mood.A:
                    Quantifier = "All  ";
                    isUniversal = true;
                    isNegative = false;
                    if (isConclusion)
                    {
                        (Subject as MajorMinorTerm).isDistributedInConclusion = true;
                        (Predicate as MajorMinorTerm).isDistributedInConclusion = false;
                    }
                    else
                    {
                        Subject.isDistributed = true;
                        if (!Predicate.isDistributed)
                        {
                            Predicate.isDistributed = false;
                        }
                    }
                    break;
                case Mood.E:
                    Quantifier = "No   ";
                    isUniversal = true;
                    isNegative = true;
                    if (isConclusion)
                    {
                        (Subject as MajorMinorTerm).isDistributedInConclusion = true;
                        (Predicate as MajorMinorTerm).isDistributedInConclusion = true;
                    }
                    else
                    {
                        Subject.isDistributed = true;
                        Predicate.isDistributed = true;
                    }
                    break;
                case Mood.I:
                    Quantifier = "Some ";
                    isUniversal = false;
                    isNegative = false;
                    if (isConclusion)
                    {
                        (Subject as MajorMinorTerm).isDistributedInConclusion = false;
                        (Predicate as MajorMinorTerm).isDistributedInConclusion = false;
                    }
                    else
                    {
                        if (!Subject.isDistributed)
                        {
                            Subject.isDistributed = false;
                        }
                        if (!Predicate.isDistributed)
                        {
                            Predicate.isDistributed = false;
                        }
                    }
                    break;
                case Mood.O:
                    Quantifier = "Some ";
                    Copula = " is not ";
                    isUniversal = false;
                    isNegative = true;
                    if (isConclusion)
                    {
                        (Subject as MajorMinorTerm).isDistributedInConclusion = false;
                        (Predicate as MajorMinorTerm).isDistributedInConclusion = true;

                    }
                    else
                    {
                        Predicate.isDistributed = true;
                        if (!Subject.isDistributed)
                        {
                            Subject.isDistributed = false;
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        public string Write()
        {
            return String.Format(Quantifier + Subject.Name + Copula + Predicate.Name);
        }
    }
}
