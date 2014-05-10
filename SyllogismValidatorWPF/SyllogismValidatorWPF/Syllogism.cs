using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyllogismValidatorWPF
{
    public class Syllogism
    {

        public Proposition FirstPropostion { get; set; }
        public Proposition SecondProposion { get; set; }
        public Proposition Conclusion { get; set; }
        public MajorMinorTerm majorTerm { get; set; }
        public MajorMinorTerm minorTerm { get; set; }
        public MiddleTerm middleTerm { get; set; }
        public Mood FirstMood { get; set; }
        public Mood SecondMood { get; set; }
        public Mood ConclusionMood { get; set; }
        public string Name { get; set; }
        public int Figure { get; set; }
        public bool isValid { get; set; }
        public int BrokenRule { get; set; }
        public int Id { get; set; }

        public Syllogism(int id, Mood one, Mood two, Mood concl, int figure)
        {
            Id = id;
            Figure = figure;
            FirstMood = one;
            SecondMood = two;
            ConclusionMood = concl;
            Name = string.Format(FirstMood.ToString() + SecondMood.ToString() + ConclusionMood.ToString() + "-" + Figure);
            majorTerm = new MajorMinorTerm("P");
            minorTerm = new MajorMinorTerm("S");
            middleTerm = new MiddleTerm("M");
            switch (Figure)
            {
                case 1:
                    FirstPropostion = new Proposition(one, middleTerm, majorTerm, false);
                    SecondProposion = new Proposition(two, minorTerm, middleTerm, false);
                    break;
                case 2:
                    FirstPropostion = new Proposition(one, majorTerm, middleTerm, false);
                    SecondProposion = new Proposition(two, minorTerm, middleTerm, false);
                    break;
                case 3:
                    FirstPropostion = new Proposition(one, middleTerm, majorTerm, false);
                    SecondProposion = new Proposition(two, middleTerm, minorTerm, false);
                    break;
                default:
                    FirstPropostion = new Proposition(one, majorTerm, middleTerm, false);
                    SecondProposion = new Proposition(two, middleTerm, minorTerm, false);
                    break;
            }
            Conclusion = new Proposition(concl, minorTerm, majorTerm, true);
        }

        public void CheckRules()
        {
            isValid = true;
            BrokenRule = 0;
            if ((FirstPropostion.isNegative) && (SecondProposion.isNegative))
            {
                //first rule broken
                isValid = false;
                if (BrokenRule == 0)
                {
                    BrokenRule = 1;
                }
            }
            if ((FirstPropostion.isNegative || SecondProposion.isNegative) && !Conclusion.isNegative)
            {
                //second rule broken
                isValid = false;
                if (BrokenRule == 0)
                {
                    BrokenRule = 2;
                }
            }
            if ((FirstPropostion.isUniversal && SecondProposion.isUniversal) && !Conclusion.isUniversal)
            {
                //third rule broken
                isValid = false;
                if (BrokenRule == 0)
                {
                    BrokenRule = 3;
                }
            }
            if (!middleTerm.isDistributed)
            {
                //fourth rule broken
                isValid = false;
                if (BrokenRule == 0)
                {
                    BrokenRule = 4;
                }
            }
            if ((!(majorTerm as MajorMinorTerm).isDistributed && (majorTerm as MajorMinorTerm).isDistributedInConclusion) || (!(minorTerm as MajorMinorTerm).isDistributed && (minorTerm as MajorMinorTerm).isDistributedInConclusion))
            {
                //fifth rule broken
                isValid = false;
                if (BrokenRule == 0)
                {
                    BrokenRule = 5;
                }
            }
        }
        public string Write()
        {
            return string.Format("\n" + FirstPropostion.Write() + "\n" + SecondProposion.Write() + "\n" + Conclusion.Write() + "\n\n");
        }
    }
}
