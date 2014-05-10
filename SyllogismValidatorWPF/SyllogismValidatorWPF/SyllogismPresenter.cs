using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyllogismValidatorWPF
{
    class SyllogismPresenter
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Validity { get; set; }

        public SyllogismPresenter(int id, string name, string validity)
        {
            Id = id;
            Name = name;
            Validity = validity;
        }
    }
}
