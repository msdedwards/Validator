using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace SyllogismValidatorWPF
{
    /// <summary>
    /// Interaction logic for SyllogismWindow.xaml
    /// </summary>
    public partial class SyllogismWindow : Window
    {
        public Syllogism Syllogism { get; set; }
        public SyllogismWindow()
        {
            InitializeComponent();
        }
        public SyllogismWindow(Syllogism s):this()
        {
            Syllogism = s;
            this.Title = s.Name;
            SyllogismName.Content = s.Name;
            this.ValidText.Content += "Validity: ";
            this.ValidText.Content = (s.isValid) ? "Valid" : "Invalid";
            this.MajorPremiseText.Content = s.FirstPropostion.Write();
            this.MinorPremiseText.Content = s.SecondProposion.Write();
            this.ConclusionText.Content = s.Conclusion.Write();
            if(!s.isValid)
            {
                this.BrokenRuleText.Content = string.Format("Rule " + s.BrokenRule);
            }
        }
    }
}
