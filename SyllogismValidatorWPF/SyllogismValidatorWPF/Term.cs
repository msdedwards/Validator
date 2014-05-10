using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyllogismValidatorWPF
{
    public class Term
    {
        public bool isDistributed { get; set; }
        public string Name { get; set; }
        public Term(string name)
        {
            Name = name;
        }
        public Term()
        {
            Name = "NO NAME!";
        }
    }
    public class MajorMinorTerm : Term
    {
        public bool isDistributedInConclusion { get; set; }
        public MajorMinorTerm(string name)
        {
            base.Name = name;
        }
    }
    public class MiddleTerm : Term
    {
        public MiddleTerm(string name)
        {
            base.Name = name;
        }
    }
}
